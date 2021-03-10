package co.digistransform.crud.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import co.digistransform.crud.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

}