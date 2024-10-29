package CardapioApi.APi.mapper;

import CardapioApi.APi.domainModel.Food;
import CardapioApi.APi.dtos.FoodDTO;

public class FoodMapper {

    public static FoodDTO toDTO(Food food) {
        return new FoodDTO(
                food.getId(),
                food.getNome(),
                food.getPreco(),
                food.getEstoque(),
                food.getDescricao(),
                food.getImagem()
        );
    }
}
