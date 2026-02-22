"use strict";
// import {App, PluginSettingTab, Setting} from "obsidian";
// import MyPlugin from "./main";
//
// export interface MyPluginSettings {
// 	mySetting: string;
// }
//
// export const DEFAULT_SETTINGS: MyPluginSettings = {
// 	mySetting: 'default'
// }
//
// export class SampleSettingTab extends PluginSettingTab {
// 	plugin: MyPlugin;
//
// 	constructor(app: App, plugin: MyPlugin) {
// 		super(app, plugin);
// 		this.plugin = plugin;
// 	}
//
// 	display(): void {
// 		const {containerEl} = this;
//
// 		containerEl.empty();
//
// 		new Setting(containerEl)
// 			.setName('Settings #1')
// 			.setDesc('It\'s a secret')
// 			.addText(text => text
// 				.setPlaceholder('Enter your secret')
// 				.setValue(this.plugin.settings.mySetting)
// 				.onChange(async (value) => {
// 					this.plugin.settings.mySetting = value;
// 					await this.plugin.saveSettings();
// 				}));
// 	}
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzZXR0aW5ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMkRBQTJEO0FBQzNELGlDQUFpQztBQUNqQyxFQUFFO0FBQ0Ysc0NBQXNDO0FBQ3RDLHNCQUFzQjtBQUN0QixJQUFJO0FBQ0osRUFBRTtBQUNGLHNEQUFzRDtBQUN0RCx3QkFBd0I7QUFDeEIsSUFBSTtBQUNKLEVBQUU7QUFDRiwyREFBMkQ7QUFDM0QscUJBQXFCO0FBQ3JCLEVBQUU7QUFDRiw2Q0FBNkM7QUFDN0Msd0JBQXdCO0FBQ3hCLDBCQUEwQjtBQUMxQixLQUFLO0FBQ0wsRUFBRTtBQUNGLHFCQUFxQjtBQUNyQixnQ0FBZ0M7QUFDaEMsRUFBRTtBQUNGLHlCQUF5QjtBQUN6QixFQUFFO0FBQ0YsNkJBQTZCO0FBQzdCLDZCQUE2QjtBQUM3QixnQ0FBZ0M7QUFDaEMsMkJBQTJCO0FBQzNCLDJDQUEyQztBQUMzQyxnREFBZ0Q7QUFDaEQsbUNBQW1DO0FBQ25DLCtDQUErQztBQUMvQyx5Q0FBeUM7QUFDekMsV0FBVztBQUNYLEtBQUs7QUFDTCxJQUFJIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0IHtBcHAsIFBsdWdpblNldHRpbmdUYWIsIFNldHRpbmd9IGZyb20gXCJvYnNpZGlhblwiO1xuLy8gaW1wb3J0IE15UGx1Z2luIGZyb20gXCIuL21haW5cIjtcbi8vXG4vLyBleHBvcnQgaW50ZXJmYWNlIE15UGx1Z2luU2V0dGluZ3Mge1xuLy8gXHRteVNldHRpbmc6IHN0cmluZztcbi8vIH1cbi8vXG4vLyBleHBvcnQgY29uc3QgREVGQVVMVF9TRVRUSU5HUzogTXlQbHVnaW5TZXR0aW5ncyA9IHtcbi8vIFx0bXlTZXR0aW5nOiAnZGVmYXVsdCdcbi8vIH1cbi8vXG4vLyBleHBvcnQgY2xhc3MgU2FtcGxlU2V0dGluZ1RhYiBleHRlbmRzIFBsdWdpblNldHRpbmdUYWIge1xuLy8gXHRwbHVnaW46IE15UGx1Z2luO1xuLy9cbi8vIFx0Y29uc3RydWN0b3IoYXBwOiBBcHAsIHBsdWdpbjogTXlQbHVnaW4pIHtcbi8vIFx0XHRzdXBlcihhcHAsIHBsdWdpbik7XG4vLyBcdFx0dGhpcy5wbHVnaW4gPSBwbHVnaW47XG4vLyBcdH1cbi8vXG4vLyBcdGRpc3BsYXkoKTogdm9pZCB7XG4vLyBcdFx0Y29uc3Qge2NvbnRhaW5lckVsfSA9IHRoaXM7XG4vL1xuLy8gXHRcdGNvbnRhaW5lckVsLmVtcHR5KCk7XG4vL1xuLy8gXHRcdG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuLy8gXHRcdFx0LnNldE5hbWUoJ1NldHRpbmdzICMxJylcbi8vIFx0XHRcdC5zZXREZXNjKCdJdFxcJ3MgYSBzZWNyZXQnKVxuLy8gXHRcdFx0LmFkZFRleHQodGV4dCA9PiB0ZXh0XG4vLyBcdFx0XHRcdC5zZXRQbGFjZWhvbGRlcignRW50ZXIgeW91ciBzZWNyZXQnKVxuLy8gXHRcdFx0XHQuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MubXlTZXR0aW5nKVxuLy8gXHRcdFx0XHQub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4vLyBcdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3MubXlTZXR0aW5nID0gdmFsdWU7XG4vLyBcdFx0XHRcdFx0YXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4vLyBcdFx0XHRcdH0pKTtcbi8vIFx0fVxuLy8gfVxuIl19