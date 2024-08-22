package com.bankingApplication.service.impl;

import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bankingApplication.dto.AccountDto;
import com.bankingApplication.entity.Account;
import com.bankingApplication.mapper.AccountMapper;
import com.bankingApplication.repository.AccountRepository;
import com.bankingApplication.service.AccountService;

@Service
public class AccountServiceImpl implements AccountService{
	
	@Autowired
	private AccountRepository accountRepository;

	public AccountServiceImpl(AccountRepository accountRepository) {
		super();
		this.accountRepository = accountRepository;
	}

	@Override
	public AccountDto createAccount(AccountDto accountDto) {

		Account account=AccountMapper.mapAccount(accountDto);
		Account savedAccount=accountRepository.save(account);
		
		return AccountMapper.mapToAccountDto(savedAccount);
	}

	@Override
	public AccountDto getAccountById(Long id) {

		
	    Account account = accountRepository.findById(id).orElseThrow(()-> new RuntimeException("Account does not exist...!"));
		return AccountMapper.mapToAccountDto(account);
	}

	@Override
	public AccountDto deposit(Long id, double amount) {

	    Account account = accountRepository.findById(id).orElseThrow(()-> new RuntimeException("Account does not exist...!"));

	    double totalBalance=account.getBalance()+amount;
		account.setBalance(totalBalance);
		Account savedAccount = accountRepository.save(account);
		return AccountMapper.mapToAccountDto(savedAccount);
	}

	@Override
	public AccountDto withdraw(Long id, double amount) {
		
	    Account account = accountRepository.findById(id).orElseThrow(()-> new RuntimeException("Account does not exist...!"));
	    if(account.getBalance()<amount) {
	    	throw new RuntimeException("Insufficient Balance...!");
	    }
	    
	    double totalBalance=account.getBalance()-amount;
	    account.setBalance(totalBalance);
	    Account saveAccount=accountRepository.save(account);
	    
		return AccountMapper.mapToAccountDto(saveAccount);
	}

	@Override
	public List<AccountDto> getAllAccounts() {
		
		return accountRepository.findAll().stream().map((account)->AccountMapper.mapToAccountDto(account)).collect(Collectors.toList());
		
		
	}

	@Override
	public void deleteAccount(Long id) {

	    Account account = accountRepository.findById(id).orElseThrow(()-> new RuntimeException("Account does not exist...!"));
	    accountRepository.delete(account);
	    
		
	}

	

}
