import { v4 as uuidv4 } from 'uuid';

export default {
  autori: [
    {
      id: '28b06180-e1b0-4f90-af96-a54f87887645',
      naziv: 'John Doe',
      djela: ['Process Mining in Practice', 'Djelo2'],
      datum: new Date().toString(),
    },
    {
      id: uuidv4(),
      naziv: 'John Smith',
      djela: ['Djelo3', 'Djelo4'],
      datum: new Date().toString(),
    },
  ],
};
