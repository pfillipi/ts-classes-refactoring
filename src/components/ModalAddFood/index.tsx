import { Component, createRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';
import { FoodInput } from '../../types'
import { Form } from './styles';
import { Modal } from '../Modal';
import { Input } from '../Input';
import { useRef } from 'react';
import { FormHandles } from '@unform/core';

interface ModalAddProps {
  setIsOpen: () => void;
  handleAddFood: (food: FoodInput) => void;
  isOpen: boolean;
}

export function ModalAddFood({ setIsOpen, handleAddFood, isOpen }: ModalAddProps) {
  const formRef = useRef<FormHandles>(null)
  async function handleSubmit(data: FoodInput) {
    if (data.name) {
      handleAddFood(data);
      setIsOpen();
    }
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />
        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />
        <Input name="description" placeholder="Descrição" />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};