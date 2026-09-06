# TNIL Obsidian

This is an [Obsidian](https://obsidian.md) plugin for rendering text in
[TNIL](https://ithkuil.net) using the fonts
[IthkuilBasic](https://github.com/shankarsivarajan/IthkuilBasic) and
[IthkuilFlow](https://github.com/shankarsivarajan/IthkuilFlow)


<img width="1471" height="365" alt="image" src="https://github.com/user-attachments/assets/b6064652-e718-4f27-8d9c-48f40d6bf840" />

<img width="1849" height="930" alt="image" src="https://github.com/user-attachments/assets/68b10850-465b-447c-9410-0f52153de88a" />

# Install

Download from the releases page and extract into your vault's `.obsidian/plugins` subfolder

# Use

## Rendering

_Note: you will only see your rendered tnil in reading mode. Live preview is not
currently supported_

### Inline

Inline: \``$tnil wattáu`\` or \``$tnil-handwritten wattáu`\` Inline code
snippets (\`\`) will parse valid tnil words and then render them

<img width="1157" height="286" alt="image" src="https://github.com/user-attachments/assets/50505136-1174-4c06-acf0-c1c30c9b7aee" />


### Code Blocks

blocks (\`\`\`) accept a raw font string. For details on that, visit
[the font repo](https://github.com/shankarsivarajan/IthkuilBasic/blob/master/documentation/character_mapping.pdf)


<img width="1219" height="506" alt="image" src="https://github.com/user-attachments/assets/455f0889-1fa6-4e3f-a3c4-ca9a4ac7f5bc" />


### Bugs

## Search

<img width="1759" height="241" alt="image" src="https://github.com/user-attachments/assets/d64e8ad4-0dd7-4338-82c9-0b9be5a541a1" />


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
