    # Design System Strategy: The Curated Estate

    ## 1. Overview & Creative North Star

    **Creative North Star: "The Ethereal Editorial"**
    This design system is not a utility; it is a destination. It moves away from the rigid, boxy layouts of traditional real estate platforms toward an editorial, high-fashion aesthetic. The goal is to make the user feel as though they are flipping through a luxury architectural digest. 

    By utilizing **intentional asymmetry**, wide-open breathing room (using our generous spacing scale), and **tonal layering**, we eliminate the "bootstrap" look. We break the template by overlapping high-end typography over soft, gradient-driven backgrounds, creating a sense of depth that feels organic rather than engineered.

    ---

    ## 2. Colors

    The color palette is anchored in a deep, authoritative primary (`#6d0c35`) balanced by a warm, inviting background (`#faf9f9`).

    *   **Primary & Containers:** Use `primary` (#6d0c35) for high-impact actions. Use `primary_container` (#8c274c) for large hero sections or featured property cards to establish a dominant brand presence.
    *   **The "No-Line" Rule:** 1px solid borders are strictly prohibited for sectioning. Definition between content blocks must be achieved through background shifts—for example, moving from `surface` to `surface_container_low` (#f4f3f3).
    *   **Surface Hierarchy & Nesting:** Treat the UI as physical layers. A property detail card (`surface_container_lowest` / #ffffff) should sit atop a search results area (`surface_container` / #eeeeee). This "paper-on-stone" nesting creates a premium tactile feel.
    *   **The "Glass & Gradient" Rule:** Floating search bars and navigation headers must use Glassmorphism. Utilize a semi-transparent `surface` color with a `backdrop-blur` of 12px-20px. 
    *   **Signature Textures:** Apply linear gradients transitioning from `primary` (#6d0c35) to `tertiary_container` (#873134) at a 135-degree angle for hero backgrounds to add a "soulful" shimmer to the digital experience.

    ---

    ## 3. Typography

    The typography scale is designed to be high-contrast and authoritative, blending geometric precision with approachable modernism.

    *   **Display & Headline (Sora/Epilogue):** These are your "Signature" fonts. Sora's wide apertures and premium weight (as seen in the "Signature Space" headline) should be used for emotional hooks. Use `display-lg` (3.5rem) with tight letter-spacing (-0.02em) to create a bold, editorial impact.
    *   **Title, UI & Body (Inter):** Inter handles everything from the "data" of real estate—square footage, price, and descriptions—to the functional UI elements like buttons and navbars with professional clarity. It provides a clean, neutral, highly readable counterpoint to the display fonts.

    ---

    ## 4. Elevation & Depth

    In this system, light is the architect. We do not use shadows to hide poor layout; we use them to simulate a curated environment.

    *   **The Layering Principle:** Avoid elevation shadows where tonal shifts can do the work. A `surface_container_highest` element on a `surface` background provides enough contrast to signify a "lift" without visual noise.
    *   **Ambient Shadows:** For floating property cards or modals, use an "Ambient Glow." Shadows must be extra-diffused: 
        *   *Offset: 0px 20px, Blur: 40px, Opacity: 4-6%, Color: derived from `on_surface` (#1a1c1c).*
    *   **The "Ghost Border" Fallback:** If a container requires a boundary (e.g., an input field), use the `outline_variant` (#dbc0c5) at **15% opacity**. A solid, 100% opaque border is a failure of the system's "Airy" ethos.
    *   **Glassmorphism:** Use `surface_bright` with 80% opacity and a heavy blur for elements that need to feel light, such as mobile navigation anchors or property filter bars.

    ---

    ## 5. Components

    ### Buttons
    *   **Primary:** Solid `primary` or a gradient from `primary` to `primary_container`. Use `rounded-full` (9999px) to maintain the "Soft Minimalism" feel.
    *   **Secondary:** A "Ghost" style. Transparent background with a `primary` label and a Ghost Border (15% opacity `outline`).
    *   **Iconography:** Always pair "Show Results" or "View Property" with a trailing `arrow_forward` to imply momentum.

    ### Cards & Lists
    *   **The Divider Ban:** Never use a horizontal line to separate list items. Use `spacing-4` (1.4rem) or subtle background alternates (`surface_container_low` vs `surface_container`).
    *   **Property Cards:** Use a `xl` (1.5rem) corner radius. The image should have a subtle inner vignette to make text overlays legible.

    ### Input Fields
    *   **Search Bar:** A large, `rounded-full` pill. Use `surface_container_lowest` (#ffffff) with an Ambient Shadow. Avoid boxes; think of it as a "vessel" for user intent.

    ### Additional: Property Badges (Chips)
    *   Used for status like "New Construction" or "Sold." Use `tertiary_fixed` (#ffdad8) with `on_tertiary_fixed` (#410008) text. These should be `rounded-md` (0.75rem) to distinguish them from the pill-shaped buttons.

    ---

    ## 6. Do's and Don'ts

    ### Do:
    *   **Use Asymmetric Padding:** Allow images to bleed to one edge of the screen while text remains centered in the grid to create an editorial layout.
    *   **Embrace Negative Space:** If a section feels crowded, double the spacing token (e.g., move from `spacing-10` to `spacing-20`).
    *   **Tone-on-Tone:** Use `on_surface_variant` for secondary text to keep the hierarchy soft and sophisticated.

    ### Don't:
    *   **No "Pure" Blacks:** Never use #000000. Use `on_surface` (#1a1c1c) for all dark text to maintain the warmth of the `BG-Warm` palette.
    *   **No Sharp Corners:** Avoid the `none` or `sm` roundedness tokens for major containers. This system is defined by its "Soft" luxury.
    *   **No Heavy Borders:** If you see a hard line, delete it. The transition between a white card and a cream background is the hallmark of high-end design.
