# Componet Style Guide

A collection of reusable React components with modern styling and functionality.

## Components

### Expandable Card

A versatile expandable card component that supports various animations and interactions. Features include:

- Smooth expand/collapse animations
- Multiple expansion directions (vertical, horizontal, both)
- Customizable sizes for collapsed and expanded states
- Rich content support with headers, body, and footer sections
- Various animation presets (fade, blur, slide)
- Controlled and uncontrolled modes

#### Usage

```tsx
import {
  Expandable,
  ExpandableCard,
  ExpandableCardContent,
  ExpandableCardFooter,
  ExpandableCardHeader,
  ExpandableContent,
  ExpandableTrigger,
} from "@/components/ui/expandable"

function ExampleCard() {
  return (
    <Expandable expandDirection="both" expandBehavior="replace">
      <ExpandableTrigger>
        <ExpandableCard
          collapsedSize={{ width: 320, height: 240 }}
          expandedSize={{ width: 420, height: 480 }}
        >
          <ExpandableCardHeader>
            {/* Header content */}
          </ExpandableCardHeader>
          <ExpandableCardContent>
            {/* Main content */}
          </ExpandableCardContent>
          <ExpandableCardFooter>
            {/* Footer content */}
          </ExpandableCardFooter>
        </ExpandableCard>
      </ExpandableTrigger>
    </Expandable>
  )
}
```

### Dependencies

- React
- Framer Motion
- Lucide React
- Tailwind CSS

### Installation

1. Install the required dependencies:
```bash
npm install framer-motion lucide-react
```

2. Copy the component files to your project
3. Configure Tailwind CSS if not already set up

## Examples

Check the `components/examples` directory for various implementation examples including:

- Design meeting card
- Product showcase card
- Weather forecast card
- Controlled expandable card

## License

MIT
