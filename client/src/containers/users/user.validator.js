import { createValidator, required } from '../../helpers/validation';

export default createValidator({
  firstName: [required],
  lastName: [required],
  password: [required],
  email: [required],
});
