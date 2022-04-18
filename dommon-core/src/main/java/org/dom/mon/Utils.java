package org.dom.mon;

import io.smallrye.jwt.build.Jwt;

public class Utils {
    public static String generateJWT(Long id, String username, String role) {
        return Jwt.upn(username)
                .groups(role)
                .claim("uid", id)
                .sign();
    }
}
