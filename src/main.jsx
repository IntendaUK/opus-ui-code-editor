/* eslint-disable max-lines-per-function, max-lines */

//System
import React from 'react';
import ReactDOM from 'react-dom/client';

//Components
import { CodeEditor } from './components/codeEditor';

//PropSpecs
import propsCodeEditor from './components/codeEditor/props';

//Opus Lib
import Opus from 'opus-ui';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<Opus
		registerComponentTypes={[{
			type: 'codeEditor',
			component: CodeEditor,
			propSpec: propsCodeEditor
		}]}
		startupMda={{
			type: 'containerSimple',
			prps: {
				singlePage: true,
				mainAxisAlign: 'center',
				crossAxisAlign: 'center'
			},
			wgts: [{
				type: 'codeEditor',
				prps: {
					language: 'json',
					valueObj: {
						type: 'label',
						traits: [],
						prps: { cpt: 'Hello world!' }
					}
				}
			}, {
				type: 'codeEditor',
				prps: {
					language: 'jsx',
					valueArray: [
						'function MyButton() {',
						'	return (',
						'		<button>I\'m a button</button>',
						'	);',
						'}'
					],
					scps: [{
						actions: [{
							type: 'setState',
							value: '{{eval.const res = {{state.self.valueArray}}; res.join("\\n");}}'
						}]
					}]
				}
			}]
		}}
	/>
);
