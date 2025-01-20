package com.demo.demo.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@OpenAPIDefinition(
        info = @Info(
                title = "IUPI Fintech",
                description = "Incluir financieramente a la población argentina en un contexto económico complejo y cambiante, brindando herramientas que faciliten el ahorro e inversión a personas de diferentes edades y niveles de experiencia.\n",
                version = "1.0.0",
                contact = @Contact(
                        name = "IUPI Fintech",
                        url = "www.iupi.com",
                        email = "iupi.sup@gmail.com"
                ),
                license = @License(
                        name = "Standard Software Use License",
                        url = "https://www.iupi.com/license"
                )
        ),
        servers = {
                @Server(description = "Development Server", url = "http://localhost:8080"),
                @Server(description = "Production Server", url = "https://h4-09-fintech-production.up.railway.app/")
        },
        security = @SecurityRequirement(name = "bearerAuth")
)
@SecurityScheme(
        name = "bearerAuth",
        description = "Bearer authentication scheme for accessing the API. A valid JWT token is required.",
        type = SecuritySchemeType.HTTP,
        scheme = "bearer",
        bearerFormat = "JWT"
)
@Configuration
public class OpenApiConfig implements WebMvcConfigurer {
    @Bean
    public GroupedOpenApi publicApi() {
        return GroupedOpenApi.builder()
                .group("public")
                .packagesToScan("com.demo")
                .build();
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry
                .addResourceHandler("/swagger-ui/**")
                .addResourceLocations("classpath:/META-INF/resources/swagger-ui/");
        registry
                .addResourceHandler("/v3/api-docs/**")
                .addResourceLocations("classpath:/META-INF/resources/openapi/");
    }
}
