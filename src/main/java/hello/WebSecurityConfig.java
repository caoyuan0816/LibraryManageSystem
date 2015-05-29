package hello;

import hello.model.MongoSecurityService;
import hello.view.AjaxAuthenticationFailureHandler;
import hello.view.AjaxAuthenticationSuccessHandler;
import hello.view.MyLogoutSuccessHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.servlet.configuration.EnableWebMvcSecurity;

@Configuration
@EnableWebMvcSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private MongoSecurityService mongoSecurityService;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .antMatchers("/").permitAll()
                .antMatchers("/api/reset-password/").authenticated()
                .antMatchers("/user").authenticated()
                .antMatchers("/upload-book/").hasRole("ADMIN")
//                .anyRequest().authenticated()
                .and()
                .formLogin()
                .loginPage("/api/login")
                .failureHandler(new AjaxAuthenticationFailureHandler())
                .successHandler(new AjaxAuthenticationSuccessHandler())
                .permitAll()
                .and()
                .logout()
                .deleteCookies("remove")
                .invalidateHttpSession(true)
                .logoutUrl("/api/logout")
                .logoutSuccessHandler(new MyLogoutSuccessHandler())
                .permitAll();
        http
                //Disable csrf
                .csrf().disable();
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth
                .userDetailsService(mongoSecurityService);
//                .inMemoryAuthentication()
//                .withUser("user").password("password").roles("USER");
    }
}