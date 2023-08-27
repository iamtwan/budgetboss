package com.backend.budgetboss.user.verification;

import java.time.LocalDateTime;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VerificationCodeRepository extends JpaRepository<VerificationCode, Long> {
  Optional<VerificationCode> findByEmail(String email);

  Optional<VerificationCode> findByEmailAndExpirationDateAfter(String email, LocalDateTime date);
}
