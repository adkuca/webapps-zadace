import { v4 as uuidv4 } from 'uuid';

export default {
  obavjesti: [
    {
      id: '46135f03-1fb2-4304-9338-e38794e89d77',
      naziv: 'Obavjest1',
      sadrzaj: 'Rok za predaju zadace je 8.11.',
      datum: new Date().toString(),
    },
    {
      id: uuidv4(),
      naziv: 'Obavjest2',
      sadrzaj: 'Rok za predaju zadace je 8.11.',
      datum: new Date().toString(),
    },
  ],
};
