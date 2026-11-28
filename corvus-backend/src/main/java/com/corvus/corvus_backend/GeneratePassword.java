
package com.corvus.corvus_backend;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class GeneratePassword {

    public static void main(String[] args) {

        BCryptPasswordEncoder encoder =
            new BCryptPasswordEncoder();

        String hash = encoder.encode("CorvusAdmin2026!");

        System.out.println("Password Hash:");
        System.out.println(hash);
    }
}

