# CSS Box Model

There are two fundamental concepts in using CSS:

1. The Flow of elements decides how elements are laid out on the page
- Examples: 
  - text appears as a text flow - each word following the other, wrapping as needed
  - `inline` elements follow text flow
  - the document flow has text flow interrupted by breaks that start over in a new line
  - `block` elements represent a break in the document flow
2. The Box Model decides how an element appears in the space the flow puts it in.
- An element has space for the content of the element (such as text or an image)
- An element has space around the content of the element, between the content and any border (padding)
  - This makes the element "larger" without increasing the size of the content
- An element has a border that can have a width (including a width of 0) (border)
- An element has space between the border and any adjacent elements (margin)

## Default Box Model Behavior

### Width and Height
 TBD

### Margins and Padding

TBD
### Margin Collapse

TBD
## Box Sizing

### Content Box
TBD
### Border Box
TBD
## Basic Uses of the Box Model

The basic uses of the Box Model are:

- Sizing, to make your elements visible and usable
- Positioning, to make your page have a visible structure and alignment

### Sizing

Elements can be too small or too "crowded" - with content adjacent to the content of other elements.  Small elements can be difficult to interact with (click or tap) and crowded elements can be difficult to read or notice.

The solution is to make them larger, creating a larger element to click/tap and to have the content visually separated from adjacent elements so it is easier to notice and read the content of this element.

Sizing changes can be done in different ways for different effects

#### Changing Content Size

When you want to have the element match a certain defined size, you change the height/width of the element.  You do this even if that definition is a relative size, such as 50% of the parent element content width (`width: 50%;`) or based on the size of text (`width: 30rem`) instead of a fixed size (`width: 150px;`).  In both cases you are changing the content size using `height` and/or `width`.  

You should be reluctant to set the width or height of elements to a fixed size.  Do so only when you know it will not cause problems for users of many different viewport sizes. You can easily create a poor UX, or alternatively create a lot more work for yourself, all of which could be avoided by not using fixed sizes.  This does not mean that fixed sizes are inherently bad, but rather that fixed sizes should be used carefully and deliberately.  

Changing the content size of an element with text does not change the size of the text itself.  The text will simply be the same size in an element that has more/less space for that text.  Changing the content size of an element with an image may change the size of the rendered image.  This is because images are a bit special - they ARE the element - while text is the content of the element.  In most other cases changing the content size of an element will not change the size of the rendered contents of the element. 

Content size can also be changed indirectly.  If an element is sized based on the parent element content size (such as with `width: auto;`, which is the default for `display: block;` elements, or any percentage width), then a change to the parent element content size will mean a change to the child element content size.  That change could be based on viewport size, etc.

#### Changing Padding

TBD


#### Changing Margin

TBD
### Positioning

TBD

## Advanced Uses of the Box Model

### Centering

TBD
### Visual Areas

TBD 
### Overlap

TBD
## Box Model in a Flex or Grid layout

TBD
