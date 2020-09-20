package com.example.stock.Controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;
import javax.validation.Valid;

import org.springframework.context.annotation.Bean;
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
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.example.stock.Exception.ResourceNotFoundException;
import com.example.stock.Model.Stream;
import com.example.stock.Reposoitory.StreamRepository;


@RestController
@CrossOrigin

@RequestMapping("/api")
public class StreamController {
	
		private StreamRepository streamRepository;

		public StreamController(StreamRepository streamRepository) {
			super();
			this.streamRepository = streamRepository;
		}
		
		
		@GetMapping("/streams")
		Collection<Stream> streams(){
			return  streamRepository.findAll();
		}
		
		//Stream/2
		@GetMapping("/streams/{id}")
		ResponseEntity<?> getStream(@PathVariable Long id){
		Optional<Stream> stream = streamRepository.findById(id);
		 return stream.map(response -> ResponseEntity.ok().body(response))
				 .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
		 
		}
		
		@PostMapping("/streams")
		ResponseEntity<Stream> createStream(@Valid @RequestBody Stream stream) throws URISyntaxException{
			Stream result= streamRepository.save(stream);
		  return ResponseEntity.created(new URI("/streams" + result.getId())).body(result); 
		
		}
		
		
		@PutMapping("/streams/{id}")
		ResponseEntity<Stream> updateStream(@Valid @RequestBody Stream stream){
			Stream result= streamRepository.save(stream);
			return ResponseEntity.ok().body(result);
		}
		
		@PatchMapping("/streams/{id}")
		ResponseEntity<Stream> updatedStream(@PathVariable(value="id") Long streamId,@Valid @RequestBody Stream stream) throws ResourceNotFoundException{
			Stream pendingStream = streamRepository.findById(streamId).orElseThrow(()->new ResourceNotFoundException("Not Found"));
			pendingStream.setTitle(stream.getTitle());
			pendingStream.setDescription(stream.getDescription());
			final Stream updatedStream = streamRepository.save(pendingStream);
			return ResponseEntity.ok(updatedStream);
		}
		
		
		@DeleteMapping("/streams/{id}")
		ResponseEntity<?> deleteStream(@PathVariable Long id){
			streamRepository.deleteById(id);
			return ResponseEntity.ok().build();
		}
		
		@Bean
	    public WebMvcConfigurer corsConfigurer() {
	        return new WebMvcConfigurer() {
	            @Override
	            public void addCorsMappings(CorsRegistry registry) {
	                registry
	                        .addMapping("/**")
	                        .allowedMethods("HEAD", "GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS");
	            }
	        };
	    }

}

