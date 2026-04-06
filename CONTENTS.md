# Market Scanner Daily Contents

## Purpose

This file stores the editorial brief for what the market paper should contain, how the scanner should think about markets, which sources it should prioritize, and which scan preferences should be remembered over time.

## Editorial Intent

Current user intent:

- scan world markets every day
- focus on special situations and catalyst-driven trades
- highlight abnormal moves across assets and equities globally
- use the scan as an early-warning system for macro, policy, geopolitical, sector, and company-level change
- have a single daily output to read like a newspaper without re-entering prompts
- use the project as a sounding board for analyzing markets and spotting trends

Preferred output style:

- on a brand-new thread or session, begin with a short English greeting before handling the first request
- keep that greeting brief and practical, for example a one-line welcome plus a suggestion like `scan` or `What's new?`
- concise overview first
- then the most important cross-asset moves
- then special situations / catalyst names
- end with a short interpretation of what changed and why it matters
- within each daily-paper section such as `Front Page`, `Cross-Asset Dashboard`, `Abnormal Moves`, and the others, prefer normal prose paragraphs over bullet-heavy formatting so the scan reads more like a newspaper
- under each main section heading, include enough concrete detail to make the section feel substantive rather than headline-only; a short section should still usually include at least one explanatory sentence or a few labeled points with context
- when the user types `Help` or something clearly similar such as `help`, `how does this work`, or `what do you do`, explain what the scanner is designed for and how the daily scan is fetched
- that `Help` response should explicitly describe the scan criteria: start from market-generated signals rather than generic headlines, screen `USO`, `VIXY`, `SPY`, and major U.S. sectors first, compare moves versus recent normal behavior when possible, then confirm and explain the moves with current reporting and official releases
- that `Help` response should list only the main explicit quick commands the user can type, keeping it minimal, for example `scan` and `help`
- the assistant should still understand short trigger prompts such as `What's new?` as requests to generate a fresh current daily market paper, even if those triggers are not listed in the `Help` response
- that `Help` response should also emphasize clearly that all scanner rules are adjustable by the user, including what to fetch, which instruments or sources to prioritize, what thresholds or criteria to use, how the paper is displayed, how it is stored, and how it is updated
- that `Help` response should explain that user-requested changes to criteria, sources, thresholds, fetch logic, storage, layout, display style, and other workflow rules should be stored and used for future scans, without mentioning the underlying memory file by name
- when the user asks a short trigger such as `What's new?`, run a fresh scan for the current date and present that scan nicely formatted in the conversation
- a scan is always a scan: do not ask whether to refresh, append, preserve, or save a previous version
- do not save each scan as a separate dated Markdown file
- always present the daily market news in the same fixed format
- when helpful, the same daily structure may also be rendered as a newspaper-style HTML page, but the chat edition remains the default output
- the HTML companion does not need to imitate any specific newspaper exactly; it may use a more creative editorial layout as long as the section order and readability stay strong
- the HTML companion should keep its main theme color easy to retune from one obvious `--theme-base` definition inside the HTML template
- the HTML companion should reflect the same real information as the in-chat `scan`; it is a presentation layer, not a separate editorial version
- the masthead tagline or undertitle should describe the role of the front page and the edition in general terms, not carry fresh market news on its own
- the undertitle should act like an editorial framing line for the edition rather than a second headline or a compressed market update
- prefer a stable generic undertitle such as "A signal-first daily brief on cross-asset moves, catalysts, and special situations." rather than day-specific wording
- do not include SEK or `USD/SEK` in the normal daily news flow by default; if FX matters, prefer broader pairs such as `EUR/USD` unless the user explicitly asks for SEK
- if SEK is explicitly requested, add a dedicated `SEK / USD Lens` section after `Cross-Asset Dashboard` rather than folding SEK into the front-page flow
- when showing the edition timestamp or date line in chat or HTML, use New York market time by default and label it as `ET`
- when a local HTML companion is produced for a scan, fill `template.html` with the current scan content and write the readable result to both `editions/YYYY-MM-DD.html` using the scan date and `editions/latest.html`
- if the `editions/` directory does not exist when generating the HTML companion, create it before writing the files
- if that same dated HTML file already exists, overwrite it with the new version for that date
- when writing the HTML companion for a scan, always overwrite `editions/latest.html` with the same content as the current scan
- the normal local HTML flow should not depend on Node, Python, or a preview server; the user may open the `editions/` folder from the file system and click the dated HTML file there

## Search Philosophy

- avoid normal news flow as the starting point; many ordinary headlines are low-signal
- create news by asking the right market questions before reading articles
- treat the market itself as the first source of news when price, volume, or volatility behave abnormally
- start with abnormality detection, then look for confirmation and explanation in reporting
- prioritize situations where the market may be pricing information before the headlines fully explain it

## Core Market Questions

- was trading volume higher or lower than normal
- was the price move bigger or smaller than normal
- what moved, and on what volume
- is volatility up or down
- is volatility higher or lower than normal
- is the move confirmed across related assets, sectors, rates, FX, commodities, or credit
- does the behavior look like new information, positioning stress, or the start of a regime shift

## Primary Screening Instruments

- oil direction, size of move, and volume should be checked first using `USO` as the main trading proxy
- volatility direction, size of move, and volume should be checked using `VIXY` as the main trading proxy
- broad U.S. equity market direction, size of move, and volume should be checked using `SPY`
- sector behavior should be checked across all major U.S. sector indexes or sector ETFs to identify breadth, divergence, and unusual concentration
- when possible, compare each of these against their own recent normal behavior before looking for headline explanations

## Daily Scan Format

Use this structure for each new daily overview.

Operational model:

- each scan request creates a new scan in chat using the fixed output structure
- short trigger prompts like `What's new?` should be treated as requests to run a fresh current-day scan immediately and then render the result in chat in polished markdown form
- short trigger prompts like `Help` should be treated as requests for a concise product description and scan-method explanation rather than a market scan

### 1. Executive Summary

Answer in 3-6 lines:

- what is driving markets today
- whether this is a normal move or a stress / transition day
- what changed versus yesterday
- include enough specificity that the summary can stand on its own as the lead read for the day

### 2. Cross-Asset Dashboard

Cover the most relevant moves across:

- global equities
- rates / bond yields
- FX
- commodities
- crypto

For each important move, note:

- direction
- magnitude
- catalyst
- whether the move looks unusual
- include brief interpretation of why the move matters, not just the tape description

### 2A. SEK / USD Lens

Only include this section when SEK is explicitly requested.

- compare `SEK/USD` with `USD/SEK`
- explain what the relationship implies for the Swedish krona versus the dollar
- keep it as a focused currency interpretation section, not a front-page lead

### 3. Abnormal Moves

Highlight outsized or unusual moves in:

- country indexes
- sectors
- single stocks
- currencies
- commodities

Prioritize:

- multi-standard-deviation style moves
- moves with a clear trigger
- moves that may imply second-order effects
- give each selected move enough detail to explain both the trigger and the likely read-through

### 4. Special Situations

Look for:

- M&A
- spin-offs
- restructurings
- financing stress
- profit warnings
- squeezes
- activist setups
- regulatory shocks
- sovereign or policy dislocations

For each idea, include:

- asset or company
- what happened
- why it matters
- what to monitor next
- prefer compact but complete writeups over bare headline mentions

### 5. Catalyst Calendar

List near-term events that could move markets next:

- central banks
- inflation / labor / growth prints
- earnings
- court rulings
- sanctions / tariff decisions
- geopolitical deadlines
- product launches
- capital markets events

### 6. Early-Info Signals

Call out signs that may matter before they are fully priced:

- divergence between U.S. and international markets
- commodities not confirming equity optimism
- FX stress in import-heavy countries
- credit / yield moves inconsistent with equity narrative
- policy signals that have not yet become the main headline

### 7. What Matters Most

End with 3-5 bullets:

- highest-conviction change
- biggest unresolved risk
- one or two situations to watch tomorrow
- when useful, add one more early tell or conditional signal that would confirm or weaken the current read
- format each item as a short label or title line followed by a separate explanatory sentence underneath, so the section reads like a set of brief conclusions rather than compressed one-liners

## Fixed Output Format

Use this exact section order for each in-chat market paper:

1. `Market Scanner Daily`
2. date line
3. `Front Page`
4. `Cross-Asset Dashboard`
5. `SEK / USD Lens` when explicitly requested
6. `Abnormal Moves`
7. `Special Situations`
8. `Catalyst Calendar`
9. `Early-Info Signals`
10. `What Matters Most`
11. `Sources`

Formatting rules for the daily paper:

- keep the same section names every day
- if a section is thin that day, keep the section and state the most relevant item briefly
- use the same newspaper-style markdown presentation in chat every day
- inside each named section, default to short flowing text paragraphs rather than lists, unless a list is clearly the best fit for that specific content
- do not let sections collapse into one-line summaries when there is enough signal to say more; prefer a little more explanatory detail under each heading
- in `What Matters Most`, keep the stronger two-level structure: a short labeled line for each conclusion and then a compact explanatory line underneath
- each scan request should produce a new scan rather than revising an earlier one
- if an HTML version is created, preserve the same section order and overall editorial logic there as well
- if an HTML version is created, keep it aligned with the factual content of the current `scan` rather than letting the HTML page drift into its own separate summary
- if a companion HTML page exists, place its link below the `Market Scanner Daily` title and the date line in a short `Today's Edition` section using a concise label such as `latest.html`, then continue with the normal text version in chat
- when a local HTML companion exists, prefer pointing directly to `editions/latest.html` in the `Today's Edition` section rather than to the folder, since that file link works more reliably here
- when the user types `scan`, treat the HTML companion link as automatic when available rather than optional; include it in the `Today's Edition` section by default
- when a scan is also rendered to HTML, treat `template.html` as the source template and keep both the matching `editions/YYYY-MM-DD.html` file and `editions/latest.html` aligned with the same edition content used in chat

## Daily Prompt Template

Use this prompt for future scans:

> Give me an overview of today in world markets, focused on special situations, catalyst trades, and bigger-than-normal moves in global assets and equities. Prioritize early signals of change in the world. Structure it as: Executive Summary, Cross-Asset Dashboard, Abnormal Moves, Special Situations, Catalyst Calendar, Early-Info Signals, and What Matters Most.

## Scan Content Rules

- start each scan from market-generated signals, not from generic news headlines
- when there has been no new full U.S. cash-equity session, still run a fresh scan by anchoring to the last full session and then layering on all meaningful developments since that close
- treat abnormal price action, abnormal volume, and abnormal volatility as the main search filters
- begin the daily screen with `USO`, `VIXY`, `SPY`, and the major U.S. sector indexes or sector ETFs before expanding into broader coverage
- for each of those core screens, always ask three things first: direction, size of move versus normal, and volume versus normal
- when possible, compare moves against what is normal for that asset rather than only using absolute moves
- prioritize items where at least two of the following are unusual: price move, trading volume, implied or realized volatility, or cross-asset confirmation
- distinguish between high-volume moves, low-volume moves, and volatility-only signals because they imply different things
- prefer situations where the market behavior appears to be generating the news, rather than merely reacting to already-consensus headlines
- prioritize primary sources and same-day reporting when possible
- separate fact from interpretation
- always identify the likely catalyst behind a move
- emphasize what is unusual, not what is merely active
- note exact dates when discussing "today", "yesterday", or upcoming catalysts
- when a scan is presented with a time-of-day stamp, prefer New York market time rather than the local machine time
- on weekends, market holidays, or any day without a new full U.S. cash-equity session, explicitly separate:
  - the last full U.S. cash-equity session
  - what changed since that session
  - what is new before the next U.S. cash open
- in those weekend or holiday scans, do not let the paper feel stale just because the U.S. cash session is unchanged; actively look for new macro releases, geopolitics, policy language, futures moves, international-market reactions, and other fresh developments since the last full session
- when the user gives a minimal prompt asking for the latest update, interpret it as a request to produce the current daily market scan
- display the scan content directly in the conversation in a readable newspaper-style markdown layout
- keep the tone and layout slightly editorial, with section bodies written like normal article copy instead of checklist bullets whenever possible
- a scan request should trigger a fresh scan immediately without asking whether to preserve or reuse a prior version

## Recurring Source Set

Use these recurring sources when relevant:

- Reuters market wraps and company updates as the default same-day reporting backbone
- Eurostat euro-area inflation releases on month-end and inflation-heavy scan days
- BLS release calendars for exact labor and inflation catalyst timing
- Federal Reserve calendars and FOMC schedules for minutes, Beige Book, and meeting dates
- company investor-relations pages when same-day earnings timing or management commentary is part of the catalyst

## Customization Layer

This section is intended for the person who will actually use the scanner day to day.

The goal is that a future developer can change what gets scanned and how it is presented by editing this file, without needing to rewrite the workflow.
The goal is that a future developer can change what gets scanned and how it is presented through prompts, while the assistant updates this file on their behalf.

### Audience And Use Case

The assistant should gather this through conversation and store the answers here:

- user knowledge level: beginner / intermediate / advanced
- primary use case: learning / idea generation / monitoring / trading / research support
- preferred tone: plain English / market professional / highly concise / highly detailed
- preferred assumption level: explain basics / skip basics

Current default assumption:

- the developer may have limited direct knowledge of global markets
- the end user may be much more knowledgeable about global markets

### Coverage Configuration

This defines what markets should be scanned.

The assistant should gather these preferences through prompts and store them here:

- regions to cover: U.S. / Europe / China / Japan / EM / global macro
- asset classes to cover: equities / rates / FX / commodities / crypto / credit
- priority markets: list the countries, indexes, sectors, or instruments that matter most
- optional markets: lower-priority areas to include only if something unusual happens
- excluded markets: areas to skip unless explicitly requested

### Event Priorities

Define which types of developments matter most to the active user.

Possible priority buckets:

- macro and central banks
- geopolitics and war
- inflation and labor
- cross-asset stress
- special situations and M&A
- earnings and guidance
- policy and regulation
- financing stress
- country-level dislocations

### Output Configuration

This defines how the daily paper should be written.

The assistant should gather these preferences through prompts and store them here:

- output length: short / medium / long
- preferred structure: fixed newspaper / dashboard / bullet brief / narrative memo
- whether to include beginner explanations: yes / no
- whether to include trade ideas: yes / no
- whether to include only facts or facts plus interpretation
- whether to include source links inline or in a separate source section
- whether to highlight only what changed since the last scan

### Signal Thresholds

Define what counts as "interesting" enough to mention.

Suggested examples:

- index move threshold
- single-stock move threshold
- FX move threshold
- yield move threshold
- commodity move threshold
- when a move must have a catalyst versus when the move alone is enough
- what counts as a special situation

These thresholds should be tailored to the active user's style. An experienced market user may want tighter thresholds and more nuance. A beginner may want only the biggest moves.

The assistant should help the user define these thresholds through prompts and then save the resulting preferences here.

### Watchlists

This section can be maintained over time.

Suggested watchlist types:

- countries
- sectors
- companies
- currencies
- commodities
- recurring themes
- named special situations

### Source Preferences

This defines how the scanner should prioritize sources.

Suggested preferences:

- preferred primary sources
- acceptable syndication sources
- sources to avoid
- whether to favor fast reporting or official releases when they conflict
- whether to include local-language sources if needed

### User Onboarding Checklist

If this project is handed to a new user, the assistant should ask them to define:

1. Which regions and markets should be scanned every day.
2. Which asset classes matter most.
3. Whether the output is for learning, idea generation, or actual trading.
4. Whether they want plain-English explanations or professional shorthand.
5. What counts as a meaningful move.
6. Which recurring situations or names they want tracked.
7. Whether they want trade framing or only market intelligence.

Once those answers are known, store them in this file and let them override earlier defaults.

The user should not need to edit this file directly. The assistant should collect these preferences conversationally and maintain this file as the durable record.

## Useful Endpoints And Sources

Store recurring links here for faster access during future scans.

Market and news sources used on March 31, 2026:

- Reuters syndication via Business Recorder: https://www.brecorder.com/news/40414090/wall-st-gains-on-mideast-de-escalation-hopes-monthly-losses-loom
- Reuters syndication via Business Recorder: https://www.brecorder.com/news/40414011
- Reuters syndication via Mix 92.9: https://mix929.com/2026/03/31/wall-st-opens-higher-on-mideast-de-escalation-hopes-monthly-losses-loom/
- Reuters syndication via Business Recorder: https://www.brecorder.com/news/40414012/gold-set-for-worst-month-in-more-than-17-years-as-us-rate-cut-hopes-fade
- Reuters syndication via Business Recorder: https://www.brecorder.com/news/40414010/war-sets-dollar-for-monthly-rise-yen-recovers-on-intervention-threat
- Reuters syndication via Business Recorder: https://www.brecorder.com/news/40413914/euro-falls-on-us-israeli-war-growth-concerns
- Reuters syndication via Business Recorder: https://www.brecorder.com/news/40413936/german-inflation-spikes-to-28pc-in-march-as-energy-costs-soar
- Reuters syndication via Business Recorder: https://www.brecorder.com/news/40413939/indias-fx-curbs-buy-rupee-some-relief-but-strain-bank-profits
- Reuters analysis on Q2 risk setup: https://mix929.com/2026/03/31/analysis-oil-and-war-top-financial-markets-worry-list-for-an-uncertain-q2/
- Reuters syndication on Unilever / McCormick talks: https://mix929.com/2026/03/31/unilever-nears-deal-to-merge-food-business-with-spice-maker-mccormick/
- Reuters syndication on Unilever / McCormick deal: https://mix929.com/2026/03/31/unilever-and-mccormick-agree-to-food-business-deal/
- Reuters on S&P 500 quarter-end setup: https://mix929.com/2026/03/31/sp-500-heads-for-worst-quarter-since-2022-as-iran-war-rate-worries-rattle-wall-street/
- Reuters on Unilever labor pushback: https://mix929.com/2026/03/31/unilever-works-council-warns-of-union-action-if-workers-are-not-protected-in-mccormick-deal/
- Japan equities wrap: https://www.brecorder.com/news/40414019/japans-nikkei-treads-water-set-to-lose-11-in-march-as-mideast-war-drags-on
- China and Hong Kong equities wrap: https://www.brecorder.com/news/40414033/china-hong-kong-stocks-set-for-worst-month-in-over-two-years-on-middle-east-unrest
- China macro / PMI reference: https://news.metal.com/en/newscontent/103833257-National-Bureau-of-Statistics-Manufacturing-PMI-Was-504-in-March-Returning-to-Expansion-Territory-as-Chinas-Economic-Sen
- Economic calendar reference: https://forex.tradingcharts.com/economic_calendar/2026-03-31.html
- Asia macro summary reference: https://www.theasiacable.com/p/asia-daily-march-31-2026

Recurring categories to build out over time:

- same-day global market wrap
- oil / energy shock monitoring
- FX stress monitoring
- inflation and rate repricing
- Asia session divergence
- special situations and M&A catalyst tracking
