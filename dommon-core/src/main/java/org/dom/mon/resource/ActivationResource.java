package org.dom.mon.resource;

import io.quarkus.mailer.MailTemplate;
import io.quarkus.qute.CheckedTemplate;
import io.smallrye.common.annotation.Blocking;
import io.smallrye.common.annotation.NonBlocking;
import io.smallrye.mutiny.Uni;
import org.dom.mon.dto.Base;
import org.dom.mon.entity.UserEntity;
import org.dom.mon.service.UserService;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.jboss.resteasy.reactive.RestPath;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.net.URI;
import java.util.Optional;


@Path("api/mail")
public class ActivationResource {

    private static Logger log = LoggerFactory.getLogger(ActivationResource.class);

    @Inject
    UserService userService;

    @CheckedTemplate
    static class EmailConfirmationTemplate {
        public static native MailTemplate.MailTemplateInstance emailConfirmation(String username, String activationLink);
    }

    @GET
    @Path("{userId}")
    @Operation(
            operationId = "Send Activation Link",
            summary = "Send verfication email with activation link to activate account")
    @APIResponse(
            responseCode = "204",
            description = "Email Sent !"
    )
    @Transactional
    public Uni<Void> sendActivationLink(@PathParam("userId") Long id) {

        UserEntity userEntity =userService.getUserById(id).get();
        log.info(userEntity.toString());
        URI activationLink = URI.create("https://dommon.herokuapp.com/api/mail/" +
                userEntity.id + "/activation?token=" +
                userEntity.getVerification().getActivationToken());

        return EmailConfirmationTemplate.emailConfirmation(userEntity.getUsername(), activationLink.toString())
                .to(userEntity.getEmailAddress())
                .subject("Verify Email to Activate Account")
                .send();
    }

    @GET
    @Path("{userId}/activation")
    @Transactional
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(
            operationId = "Verify User",
            summary = "Activate user account")
    @APIResponse(
            responseCode = "200",
            description = "Account activated!"
    )
    public Response verifyUser(
            @PathParam("userId") Long id,
            @QueryParam("token") String token) {

        Optional<UserEntity> userEntityOptional = userService.getUserById(id);
        if (userEntityOptional.isEmpty())
            return Response.status(Response.Status.NOT_FOUND).entity(new Base(false, "User not found!")).build();

        UserEntity userEntity = userEntityOptional.get();
        if (userEntity.verification.getExpired())
            return Response.status(Response.Status.BAD_REQUEST).entity(new Base(false, "Token used!")).build();
        userEntity.setVerified(true);
        userEntity.verification.setExpired(true);
        userEntity.persist();

        return Response.status(Response.Status.OK).entity(new Base(true, "Account activated!")).build();
    }
}
