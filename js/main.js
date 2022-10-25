import {createObjects} from './data.js';
import {createMiniatures} from './create-miniatures.js';
import './upload-photo-form.js';
import './image-editing.js';
createObjects();
createMiniatures(createObjects());
