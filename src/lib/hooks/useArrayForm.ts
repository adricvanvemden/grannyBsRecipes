import { FieldValues, useFieldArray, UseFormReturn, ArrayPath, FieldArray } from 'react-hook-form';

function useArrayForm<T extends FieldValues>(form: UseFormReturn<T>, fieldName: ArrayPath<T>) {
  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: fieldName,
  });

  const addItem = (value: FieldArray<T, ArrayPath<T>>) => append(value);
  const deleteItem = (index: number) => remove(index);
  const moveItemUp = (index: number) => move(index, index - 1);
  const moveItemDown = (index: number) => move(index, index + 1);

  return { form, fields, addItem, deleteItem, moveItemUp, moveItemDown };
}

export default useArrayForm;
