package com.backend.budgetboss.user.verification;

import java.time.LocalDateTime;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VerificationTokenRepository extends JpaRepository<VerificationToken, Long> {
  Optional<VerificationToken> findByEmail(String email);

  Optional<VerificationToken> findByTokenAndExpirationDateAfter(String token, LocalDateTime date);
}
