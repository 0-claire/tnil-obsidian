# TNIL Obsidian

This is an [Obsidian](https://obsidian.md) plugin for rendering text in [TNIL](https://ithkuil.net) using the fonts [IthkuilBasic](https://github.com/shankarsivarajan/IthkuilBasic) and [IthkuilFlow](https://github.com/shankarsivarajan/IthkuilFlow)

# Install 
- Download from the releases page and extract into your vault's `.obsidian/plugins` subfolder

# Use

*Screenshots coming soon*

*Note: you will only see your rendered tnil in reading mode. Live preview is not currently supported*

Inline: \``$tnil wattáu`\` or \``$tnil-handwritten wattáu`\`
Inline code snippets (\`\`) will parse valid tnil words and then render them. Meanwhile code blocks (\`\`\`) accept a raw font string. For details on that, visit [the font repo](https://github.com/shankarsivarajan/IthkuilBasic/blob/master/documentation/character_mapping.pdf)

Code blocks:

\`\`\`tnil

\t_t<a

\`\`\`

\`\`\`tnil-handwritten

\t_t<a

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
