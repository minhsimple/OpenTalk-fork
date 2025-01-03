package ncc.java.opentalk.common;

import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Component;
import org.springframework.web.context.WebApplicationContext;

@Component
//@Scope("prototype")
@Scope(value = WebApplicationContext.SCOPE_REQUEST, proxyMode = ScopedProxyMode.TARGET_CLASS)
@Slf4j
public class RandomOpenTalkNumberGenerator {
    @PostConstruct
    public void postConstruct() {
        log.info("=============*Starting RandomOpenTalkNumberGenerator*=============");
    }

    public double generateOpenTalkNumber() {
        return Math.random();
    }

    @PreDestroy
    public void preDestroy() {
        log.info("=============*Stopping RandomOpenTalkNumberGenerator*=============");
    }
}
