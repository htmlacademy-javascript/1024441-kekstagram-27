import {createObjects} from './data.js';
import {createMiniatures} from './create-miniatures.js';
import './upload-photo-form.js';

createObjects();
createMiniatures(createObjects());
