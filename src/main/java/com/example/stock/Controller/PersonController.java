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
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.stock.Model.Person;
import com.example.stock.Reposoitory.PersonRepository;


@RestController
@CrossOrigin

@RequestMapping("/api")
public class PersonController {
	
		private PersonRepository personRepository;

		public PersonController(PersonRepository personRepository) {
			super();
			this.personRepository = personRepository;
		}
		
		
		@GetMapping("/persons")
		Collection<Person> persons(){
			return  personRepository.findAll();
		}
		
		@GetMapping("/persons/{id}")
		ResponseEntity<?> getPerson(@PathVariable Long id){
		Optional<Person> person = personRepository.findById(id);
		 return person.map(response -> ResponseEntity.ok().body(response))
				 .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
		 
		}
		
		@PostMapping("/persons")
		ResponseEntity<Person> createPerson(@Valid @RequestBody Person person) throws URISyntaxException{
			Person result = new Person();
			result.setIdperson(person.getIdperson());
			result = personRepository.save(result);
			//might have to create case where person already exist if i keep creating same person id
		  return ResponseEntity.created(new URI("/securitys" + result.getIdperson())).body(result); 
		
		}
//		@PatchMapping("/streams/{id}")
//		ResponseEntity<Stream> updatedStream(@PathVariable(value="id") Long streamId,@Valid @RequestBody Stream stream) throws ResourceNotFoundException{
//			Stream pendingStream = streamRepository.findById(streamId).orElseThrow(()->new ResourceNotFoundException("Not Found"));
//			pendingStream.setTitle(stream.getTitle());
//			pendingStream.setDescription(stream.getDescription());
//			final Stream updatedStream = streamRepository.save(pendingStream);
//			return ResponseEntity.ok(updatedStream);
//		}
//		
		
		
		@PutMapping("/persons/{id}")
		ResponseEntity<Person> updatePersons(@Valid @RequestBody Person person){
			Person result= personRepository.save(person);
			return ResponseEntity.ok().body(result);
		}
		
		
		
		@DeleteMapping("/persons/{id}")
		ResponseEntity<?> deletePerson(@PathVariable Long id){
			personRepository.deleteById(id);
			return ResponseEntity.ok().build();
		}
		
		
}

