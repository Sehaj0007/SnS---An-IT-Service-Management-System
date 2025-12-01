package com.itsm.itsm_backend.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // enable CORS using the bean defined below
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            // disable CSRF for stateless REST APIs
            .csrf(AbstractHttpConfigurer::disable)
            .authorizeHttpRequests(auth -> auth
                // permit preflight requests
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                // public endpoints
                .requestMatchers("/api/auth/**", "/api/services/**", "/api/components/**", "/api/contact").permitAll()
                // (optional) allow H2 console while developing; remove in production
                .requestMatchers("/h2-console/**").permitAll()
                // allow logged-in users to post appointments
                .requestMatchers(HttpMethod.POST, "/api/appointments").authenticated()
                // everything else requires authentication
                .anyRequest().authenticated()
            )
            // stateless because we use JWT
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            // use custom authentication provider (DAO + BCrypt)
            .authenticationProvider(authenticationProvider)
            // JWT filter should run before the UsernamePasswordAuthenticationFilter
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        // If you enabled H2 console above, disable frame options so console can render in browser
        http.headers(headers -> headers.frameOptions(frame -> frame.sameOrigin()));

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        // allow only React dev origin (recommended)
        configuration.setAllowedOrigins(List.of("http://localhost:3000"));

        // --- If you want quick testing and don't want to worry about origins, you can
        // uncomment the following line to allow all origins (NOT recommended for production)
        // configuration.setAllowedOrigins(List.of("*"));

        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        // allow Authorization header and all other headers
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
