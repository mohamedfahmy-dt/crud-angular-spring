package co.digistransform.crud.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
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

import co.digistransform.crud.exception.ResourceNotFoundException;
import co.digistransform.crud.model.User;
import co.digistransform.crud.repository.UserRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/users")
public class UserController {
  @Autowired
  private UserRepository userRepository;

  @GetMapping("/getAllUsers")
  public List<User> getAllUsers() {
    return userRepository.findAll();
  }

  @GetMapping("/getUserById/{id}")
  public ResponseEntity<User> getUserById(@PathVariable(value = "id") Long userId) throws ResourceNotFoundException {
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new ResourceNotFoundException("User not found for this id : " + userId));
    return ResponseEntity.ok().body(user);
  }

  @PostMapping("/createUser")
  public User createUser(@Valid @RequestBody User user) {
    return userRepository.save(user);
  }

  @PutMapping("/updateUser/{id}")
  public ResponseEntity<User> updateUser(@PathVariable(value = "id") Long userId, @Valid @RequestBody User userDetails)
      throws ResourceNotFoundException {
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new ResourceNotFoundException("User not found for this id :: " + userId));

    user.setName(userDetails.getName());
    user.setLatitude(userDetails.getLatitude());
    user.setLongitude(userDetails.getLongitude());
    final User updatedUser = userRepository.save(user);
    return ResponseEntity.ok(updatedUser);
  }

  @DeleteMapping("/deleteUser/{id}")
  public Map<String, Boolean> deleteUser(@PathVariable(value = "id") Long userId) throws ResourceNotFoundException {
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new ResourceNotFoundException("User not found for this id :: " + userId));

    userRepository.delete(user);
    Map<String, Boolean> response = new HashMap<>();
    response.put("deleted", Boolean.TRUE);
    return response;
  }
}