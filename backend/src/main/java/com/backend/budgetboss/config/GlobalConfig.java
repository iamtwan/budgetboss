package com.backend.budgetboss.config;

import com.backend.budgetboss.account.Account;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.plaid.client.ApiClient;
import com.plaid.client.model.AccountBase;
import com.plaid.client.request.PlaidApi;
import java.util.HashMap;
import java.util.Map;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
public class GlobalConfig {

  @Bean
  public ModelMapper modelMapper() {
    ModelMapper modelMapper = new ModelMapper();

    modelMapper.typeMap(AccountBase.class, Account.class)
        .addMappings(mapper -> mapper.skip(Account::setId));

    return modelMapper;
  }

  @Bean
  public Gson gson() {
    return new GsonBuilder().setPrettyPrinting().create();
  }

  @Bean
  public BCryptPasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public PlaidApi plaidApi() {
    Map<String, String> apiKeys = new HashMap<>();
    apiKeys.put("clientId", "6438697aab53b0001409298d");
    apiKeys.put("secret", "1486f87546527c19d79d25cf00f034");

    ApiClient apiClient = new ApiClient(apiKeys);
    apiClient.setPlaidAdapter(ApiClient.Sandbox);

    return apiClient.createService(PlaidApi.class);
  }
}
