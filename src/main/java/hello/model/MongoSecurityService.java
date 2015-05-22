package hello.model;

import hello.model.Account;
import hello.model.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.security.ldap.populator.DefaultLdapAuthoritiesPopulator;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by yuan on 15/5/17.
 */
@Service("mongoSecurityService")
public class MongoSecurityService implements UserDetailsService {
    private Account user_account;

    @Autowired
    private AccountRepository accountRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        this.user_account = accountRepository.findByUsernameAndValidated(username, true);

        if (user_account != null) {
            boolean enabled = true;
            boolean accountNonExpired = true;
            boolean credentialsNonExpired = true;
            boolean accountNonLocked = true;

            return new User(this.user_account.getUsername(), this.user_account.getPassword(), true, true, true, true,
                    getGrantedAuthorities());
        }

        return new User("", "", true, true, true, true, getGrantedAuthorities());
    }

    public List getGrantedAuthorities() {

        List authorities = new ArrayList();
        authorities.add(new SimpleGrantedAuthority("ROLE_USER"));

        return authorities;
    }
}
