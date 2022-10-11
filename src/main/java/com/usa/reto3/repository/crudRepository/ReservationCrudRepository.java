package com.usa.reto3.repository.crudRepository;

import com.usa.reto3.entities.Reservation;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Date;
import java.util.List;

public interface ReservationCrudRepository extends CrudRepository<Reservation,Integer> {

    @Query("SELECT c.client, COUNT (c.client) FROM Reservation AS c GROUP BY c.client ORDER BY COUNT (c.client) DESC")
    List<Object[]> countTotalReservationsByClient();
    List<Reservation> findAllByStartDateAfterAndDevolutionDateBefore(Date dateOne, Date dateTwo);
    List<Reservation> findAllByStatus(String status);
}

