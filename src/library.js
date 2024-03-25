//Components
import { CodeEditor } from './components/codeEditor';

//PropSpecs
import propsCodeEditor from './components/codeEditor/props';

import { registerComponentTypes } from 'opus-ui';

registerComponentTypes([{
	type: 'codeEditor',
	component: CodeEditor,
	propSpec: propsCodeEditor
}]);
