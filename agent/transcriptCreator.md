Take the `README.md` and `README.marp.adoc` files and create a lecture transcript for each slide. If `README.marp.adoc` does not exist, use `README.md` as the source of truth.

Write the output to `README.transcript` in the same directory.

## Lecture Goal

The transcript must feel like a real, fully teachable lecture for college students who already know the basics of the topic but need stronger conceptual understanding, practical engineering guidance, and clearer decision-making intuition.

Target:
- 12 to 15 minutes when read aloud
- approximately 1800 to 2600 words total unless the source deck is unusually small
- do not produce short expanded notes; produce a full teaching script
- for small decks, maintain depth by expanding each slide more rather than accepting a short overall result

The transcript must be substantially deeper than the source bullets. Do not merely paraphrase or lightly expand the slides.

## Audience

Assume the audience:
- knows general software and distributed systems basics
- may recognize the terminology but not yet understand how to apply it well
- needs examples of how teams use the concept in real systems
- needs to understand failure modes, misuse patterns, and tradeoffs

## Required Depth

For every slide, expand the material into speaker-ready notes that do most of the following:
- explain the concept in plain language
- explain why it exists or what problem it solves
- explain what would happen if the concept or pattern were missing
- give a realistic software engineering or production example
- explain how a team or developer would actually use the pattern, technology, or method
- explain at least one tradeoff or downside
- explain at least one likely mistake, misuse, or misunderstanding when relevant
- connect naturally to the next slide
- explain the operational or implementation consequence when relevant

The transcript should teach, not just describe.

## Minimum Content Expectation Per Slide

For most slides, include at least two substantial teaching paragraphs.

For slides that introduce a central concept, delivery guarantee, architectural pattern, or major tradeoff:
- prefer three substantial teaching moves rather than two

For major concept slides, prefer three teaching moves:
- concept and problem
- practical example and implementation usage
- tradeoff, failure mode, or common misuse

For small code or diagram slides, it is acceptable to be shorter, but still explain:
- what is happening
- when a team would use it
- one practical consequence or limitation

## Special Guidance by Slide Type

If the slide is conceptual:
- define the concept clearly
- explain why it matters in real systems
- provide a realistic example
- explain one likely misunderstanding
- explain what goes wrong if a team ignores the concept

If the slide contains code:
- explain what the code is doing at a high level
- explain when a team would choose this approach
- explain one limitation, production risk, or operational consequence
- do not waste space narrating obvious syntax line by line
- explain what infrastructure or design assumptions the code relies on when relevant

If the slide is about architecture or tradeoffs:
- explain when the approach is a good fit
- explain when it is a bad fit
- explain what is gained
- explain what is sacrificed
- explain what teams commonly underestimate about it
- explain how the choice changes operational behavior or debugging complexity

If the slide contains a diagram:
- walk through the interaction or sequence in spoken form
- explain why the diagram matters
- call out the main operational or architectural lesson shown
- explain what failure or coordination point the diagram helps students notice

## Depth Boosters

Use these deliberately to increase teaching value:
- compare the concept to a simpler alternative
- explain a realistic incident or operational scenario
- explain how a junior engineer might misuse the pattern
- explain how a senior team would reason about adopting it
- explain what metrics, logs, or operational signals matter for it
- explain what a customer or business stakeholder would observe if the design choice goes wrong

Do not add fluff. Add substance.

## Style Requirements

- Write in spoken lecture style, not textbook summary style
- Use complete natural paragraphs
- Avoid bullet-point narration in the transcript body
- Prefer concrete examples over abstract restatement
- Prefer explanation over repetition
- Use analogies only when they genuinely improve clarity
- Do not pad with generic motivational language
- Keep the focus on teaching value and engineering realism
- Avoid sounding like slide bullets converted directly into sentences
- Make the transcript feel like something a teacher could read aloud with minimal editing

## Structure

- Include a short intro section at the top identifying the transcript
- Follow the slide order from the source deck
- Use section headings like `## Slide 1: ...`
- Ensure every slide in the source is represented

## Anti-Patterns to Avoid

- Do not simply restate slide bullets in full sentences
- Do not write one thin paragraph per slide if the concept deserves more depth
- Do not skip implementation guidance for technical slides
- Do not ignore tradeoffs, risks, or failure cases
- Do not produce a transcript that sounds like presenter notes shorthand
- Do not let code slides become syntax narration with no architectural lesson
- Do not let short decks produce shallow transcripts
- Do not end major concept slides without a concrete example or consequence

## Practical Heuristics

Use these heuristics while generating:
- If a slide contains only a few bullets, expand the missing context rather than staying short
- If a slide introduces terminology for the first time, define it in plain language before going deeper
- If a slide names a pattern, explain when a team would choose it and when they should hesitate
- If a slide describes a guarantee, explain what that guarantee does not protect against
- If a slide contains a risk or tradeoff list, turn it into explanatory teaching paragraphs rather than a compressed summary
- If the deck is technically dense, keep the pacing explanatory rather than trying to cover too many terms too quickly

## Output Requirement

Write only the lecture transcript content to `README.transcript`.
