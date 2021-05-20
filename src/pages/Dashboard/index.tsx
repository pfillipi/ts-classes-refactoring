import { Header } from '../../components/Header';
import { ModalAddFood } from '../../components/ModalAddFood';
import { ModalEditFood } from '../../components/ModalEditFood';
import { FoodComponent } from '../../components/Food';
import { FoodsContainer } from './styles';
import { useState } from 'react';
import { Food, FoodInput } from '../../types';
import { useFoods } from '../../hooks/useFoods';

export function Dashboard() {
  const [editingFood, setEditingFood] = useState<Food>();
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const { foods, createFood, deleteFood, editFood } = useFoods();

  function toggleModal() {
    setModalOpen(!editModalOpen);
  }

  function toggleEditModal() {
    setEditModalOpen(!editModalOpen);
  }

  function handleEditFood(food: Food) {
    setEditingFood(food);
    setEditModalOpen(true);
  }

  return (
    <>
      <Header handleOpenModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={(food: FoodInput) => createFood(food)}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={(food: Food) => editFood(food)}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <FoodComponent
              key={food.id}
              food={food}
              handleDelete={(id: number) => deleteFood(id)}
              handleEditFood={() => handleEditFood(food)}
            />
          ))}
      </FoodsContainer>
    </>
  );
};
