package org.dom.mon.service;

import io.quarkus.mailer.MailTemplate;
import io.quarkus.qute.CheckedTemplate;
import io.smallrye.mutiny.Uni;

import javax.ws.rs.core.Response;

public class EmailService {

    @CheckedTemplate
    static class Templates {
        public static native MailTemplate.MailTemplateInstance hello(String name);
    }

    public Uni<Void> sendActivationLink() {
        return Templates.hello("John")
                .to("xelekem597@hhmel.com")
                .subject("Hello from Qute template")
                .send()
                .map(x -> Response.accepted().build());
    }
}
