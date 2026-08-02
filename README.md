# TNIL Obsidian

This is an [Obsidian](https://obsidian.md) plugin for rendering text in
[TNIL](https://ithkuil.net) using the fonts
[IthkuilBasic](https://github.com/shankarsivarajan/IthkuilBasic) and
[IthkuilFlow](https://github.com/shankarsivarajan/IthkuilFlow)

# Install

- Download from the releases page and extract into your vault's
  `.obsidian/plugins` subfolder

# Use

_Screenshots coming soon_

## Rendering

_Note: you will only see your rendered tnil in reading mode. Live preview is not
currently supported_

### Inline

Inline: \``$tnil wattáu`\` or \``$tnil-handwritten wattáu`\` Inline code
snippets (\`\`) will parse valid tnil words and then render them

### Code Blocks

blocks (\`\`\`) accept a raw font string. For details on that, visit
[the font repo](https://github.com/shankarsivarajan/IthkuilBasic/blob/master/documentation/character_mapping.pdf)

\`\`\`tnil

\t_t<a

\`\`\`

\`\`\`tnil-handwritten

\t_t<a

\`\`\`

### Bugs

## Search

| Search Field | Meaning                                                                         |
| ------------ | ------------------------------------------------------------------------------- |
| Notes        | body of affix/roots E.g. stems classification and degrees                       |
| Refers       | the title of a root(inside the " " ) e.g. be (for the copular root)             |
| Name         | the 3 letter code for an affix                                                  |
| Consonant    | the letters you put in to a formative                                           |
| Description  | is the part of the title of roots (out side of the " ") and the name of affixes |

### Bugs

- [ ] "if a root is described in a similar way as " 'branchiopod' I " then you
      cannot search for the full version of the name only the bit in the '' or
      the roman numeral"
- [ ] in order to search for this root using the consonant form you must use
      this form ḑgl other forms like ḍgl don't work
- [ ] lexicon-json is out of date (material highlighted in blue in the latest
      docs as of 2026-08-13 is not available)
- [ ] There is also some strangeness going with case sensitivity as it will
      often find things some times but not others and changing the case can get
      it to find things when it can't E.g. Deictic vs deictic vs DEICTICV

# Build

- _notes for dependency repo coming soon_
- Clone this repo to the vault of your choice in .obsidian/plugins
- Clone the [TNILBot]() repo to xyz & run `npm i ../TNILBot`;
- Download the fonts
  [IthkuilBasic](https://github.com/shankarsivarajan/IthkuilBasic/blob/master/builds/IthkuilBasic.ttf)
  &
  [IthkuilFlow](https://github.com/shankarsivarajan/IthkuilFlow/blob/master/builds/IthkuilFlow.ttf)
  to `src/fonts/`
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
