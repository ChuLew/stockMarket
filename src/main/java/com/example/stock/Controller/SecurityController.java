package com.example.stock.Controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;
import javax.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.stock.Model.Security;
import com.example.stock.Reposoitory.SecurityRepository;


@RestController
@CrossOrigin

@RequestMapping("/api")
public class SecurityController {
	
		private SecurityRepository securityRepository;

		public SecurityController(SecurityRepository securityRepository) {
			super();
			this.securityRepository = securityRepository;
		}
		
		
		@GetMapping("/securitys")
		Collection<Security> securitys(){
			return  securityRepository.findAll();
		}
		
		@GetMapping("/securitys/{id}")
		ResponseEntity<?> getSecurity(@PathVariable Long id){
		Optional<Security> security = securityRepository.findById(id);
		 return security.map(response -> ResponseEntity.ok().body(response))
				 .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
		 
		}
		
		@PostMapping("/securitys")
		ResponseEntity<Security> createSecurity(@Valid @RequestBody Security security) throws URISyntaxException{
			Security result= securityRepository.save(security);
		  return ResponseEntity.created(new URI("/securitys" + result.getIdstock())).body(result); 
		
		}
		
		
		@PutMapping("/securitys/{id}")
		ResponseEntity<Security> updateSecuritys(@Valid @RequestBody Security security){
			Security result= securityRepository.save(security);
			return ResponseEntity.ok().body(result);
		}
		
		
		
		@DeleteMapping("/securitys/{id}")
		ResponseEntity<?> deleteSecurity(@PathVariable Long id){
			securityRepository.deleteById(id);
			return ResponseEntity.ok().build();
		}
		
		
}

