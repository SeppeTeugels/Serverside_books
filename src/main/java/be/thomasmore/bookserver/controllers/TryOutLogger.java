package be.thomasmore.bookserver.controllers;


import io.swagger.v3.oas.annotations.Operation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/logging")
public class TryOutLogger {
    Logger logger = LoggerFactory.getLogger(TryOutLogger.class);

    @Operation(summary = "try out log levels. See application.properties. " +
            "Attention this is not a good request handler concerning REST interface conventions")
    @GetMapping("")
    public String logging() {
        logger.info("##### try out logging");
        logger.trace("TRACE message");
        logger.debug("DEBUG message");
        logger.info("INFO message");
        logger.warn("WARNING message");
        logger.error("ERROR message");
        return "check the server logging!";
    }

}
