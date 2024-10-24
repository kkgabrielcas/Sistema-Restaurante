package CardapioApi.APi.dtos;

import CardapioApi.APi.domainModel.Food;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodRepository extends JpaRepository<Food, Long> {
}
