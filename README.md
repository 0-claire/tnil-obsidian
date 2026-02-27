# TNIL Obsidian

This is an [Obsidian](https://obsidian.md) plugin for rendering text in [TNIL](https://ithkuil.net) using the fonts [IthkuilBasic](https://github.com/shankarsivarajan/IthkuilBasic) and [IthkuilFlow](https://github.com/shankarsivarajan/IthkuilFlow)

# Install 
- Download from the releases page and extract into your vault's `.obsidian/plugins` subfolder

# Use

*Screenshots coming soon*

Inline: \`$tnil <text>\` or \`$tnil-handwritten <text>\`

Code blocks:
\`\`\`$tnil
<raw font string>
\`\`\`

\`\`\`$tnil-handwritten
<raw ffont string>
\`\`\`

# Build
- *notes for dependency repo coming soon*
- Clone this repo to the vault of your choice in .obsidian/plugins
- Clone the [TNILBot]() repo to xyz & run `npm i ../TNILBot`;
- Download the fonts [IthkuilBasic](https://github.com/shankarsivarajan/IthkuilBasic/blob/master/builds/IthkuilBasic.ttf) & [IthkuilFlow](https://github.com/shankarsivarajan/IthkuilFlow/blob/master/builds/IthkuilFlow.ttf) to `src/fonts/`
- Run `npm i`
- Run `npm build`
- Reload obsidian
- Enable obsidian-tnil

# Roadmap
- [ ] Search design docs & yuorb
    - [ ] RegEx search
    - [ ] Ignore case checkbox for normal search
    - [x] Search roots
    - [x] Search Standard Affixes
    - [ ] Search accessor & other affixes
