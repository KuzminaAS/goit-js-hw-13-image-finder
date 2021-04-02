import { error } from '@pnotify/core';
import { defaults } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';

defaults.delay = 3000;

export function onError(message) {
    error( {text: message}
        
    )
}
jkk