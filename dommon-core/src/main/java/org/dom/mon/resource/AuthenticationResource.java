package org.dom.mon.resource;

import org.dom.mon.Global;
import org.dom.mon.Utils;
import org.dom.mon.dto.Base;
import org.dom.mon.dto.auth.AuthnLogin;
import org.dom.mon.dto.auth.AuthnRegister;
import org.dom.mon.entity.UserEntity;
import org.dom.mon.service.UserService;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;

import javax.annotation.security.PermitAll;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import java.util.Optional;

@Path("api/auth")
public class AuthenticationResource {

    @Inject
    UserService userService;

    @Context
    SecurityContext securityContext;

    @POST
    @Path("register")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(
            operationId = "Register",
            summary = "Register new user")
    @APIResponse(
            responseCode = "201",
            description = "User Created"
    )
    @Transactional
    public Response register(AuthnRegister authnRegister) {

        final String username = authnRegister.getUsername();
        final String emailAddress = authnRegister.getEmailAddress();
        final String password = authnRegister.getPassword();

        if(!userService.validatePassword(password))
            return Response.status(Response.Status.BAD_REQUEST).entity(new Base(null, false, "Invalid Password")).build();

        if (userService.getUserByUsername(username).isPresent())
            return Response.status(Response.Status.CONFLICT).entity(new Base(null, false, "Username already exist !")).build();

        if(userService.checkEmailExist(emailAddress))
            return Response.status(Response.Status.CONFLICT).entity(new Base(null, false, "Email address already exist !")).build();


        UserEntity userEntity = userService.createUser(username, emailAddress, password);
        userEntity.persist();

        userService.createActivation(userEntity);

        return Response.status(Response.Status.CREATED).entity(new Base(userEntity.id, true, "Registration complete! Please check your email for activation link!")).build();
    }

    @POST
    @Path("login/user")
    @PermitAll
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(
            operationId = "User Login",
            summary = "Basic Auth for Log user in")
    @APIResponse(
            responseCode = "200",
            description = "Successfully login"
    )
    public Response loginUser(AuthnLogin authnLogin) {
        final String username = authnLogin.getUsername();
        Optional<UserEntity> userEntityOptional = userService.getUserByUsername(username);

        if (userEntityOptional.isEmpty() || !username.equals(authnLogin.getUsername()))
            return Response.status(Response.Status.NOT_FOUND).entity(new Base(false, "User doesn't exist !")).build();

        UserEntity userEntity = userEntityOptional.get();
        if(!userService.verifyPassword(authnLogin.getPassword(), userEntity.getPassword()))
            return Response.status(Response.Status.UNAUTHORIZED).entity(new Base(false, "Wrong username or password !")).build();

        if(!userEntity.getVerified())
            return Response.status(Response.Status.BAD_REQUEST).entity(new Base(false, "Account not verified !")).build();

        String token = Utils.generateJWT(userEntity.id, userEntity.getUsername(), userEntity.getRole());
        return Response.ok(new Base("Bearer " + token, true, "Successfully Logged In")).build();
    }
}
