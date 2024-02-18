import { useFieldArray } from 'react-hook-form';

function useArrayForm(form: any, fieldName: string) {
  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: fieldName,
  });

  const addItem = (value: any) => append(value);
  const deleteItem = (index: number) => remove(index);
  const moveItemUp = (index: number) => move(index, index - 1);
  const moveItemDown = (index: number) => move(index, index + 1);

  return { form, fields, addItem, deleteItem, moveItemUp, moveItemDown };
}

export default useArrayForm;
