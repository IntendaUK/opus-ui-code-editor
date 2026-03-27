//Components
import { CodeEditor } from './components/codeEditor';

//PropSpecs
import propsCodeEditor from './components/codeEditor/props';

//Components
export * from './libraryComponents';

import { registerComponentTypes } from '@intenda/opus-ui';

registerComponentTypes([{
	type: 'codeEditor',
	component: CodeEditor,
	propSpec: propsCodeEditor
}]);
