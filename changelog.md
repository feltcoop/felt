# changelog

## 0.4.4

- publish `ui/style.css` and `ui/Markup.svelte`
  ([#93](https://github.com/feltcoop/felt/pull/93))

## 0.4.3

- fix published types
  ([#92](https://github.com/feltcoop/felt/pull/92))

## 0.4.2

- publish component `ui/Pending_Animation.svelte`
  ([#91](https://github.com/feltcoop/felt/pull/91))

## 0.4.1

- export `Async_Status` and `wait` from root
  ([#89](https://github.com/feltcoop/felt/pull/89))

## 0.4.0

- **break**: remove camelCase terminal color exports and rename `color_bg` from `bg_color`
  ([#88](https://github.com/feltcoop/felt/pull/88))
- **break**: rename `avocado` from `avacado` 🥑
  ([#88](https://github.com/feltcoop/felt/pull/88))
- add `random_bool` to `util/random.ts`
  ([#88](https://github.com/feltcoop/felt/pull/88))
- change `random_item` return type to exclude `undefined`
  ([#88](https://github.com/feltcoop/felt/pull/88))
- upgrade Gro to 0.28.2
  ([#87](https://github.com/feltcoop/felt/pull/87))

## 0.3.0

- **break**: swap the names of `spawn` and `spawn_process`
  ([#63](https://github.com/feltcoop/felt/pull/63))
- **break**: rename `spawn_restartable_process` from `create_restartable_process`
  and remove its `delay` arg
  ([#63](https://github.com/feltcoop/felt/pull/63))
- **break**: rename `util/timings.ts` from `util/time.ts`
  ([#63](https://github.com/feltcoop/felt/pull/63))
- **break**: rename `Timings.get_all` from `Timings.getAll`
  ([#63](https://github.com/feltcoop/felt/pull/63))
- upgrade Gro to 0.28.1
  ([#63](https://github.com/feltcoop/felt/pull/63))

## 0.2.2

- fix another issue with published types
  ([#86](https://github.com/feltcoop/felt/pull/86))

## 0.2.1

- fix published types
  ([#86](https://github.com/feltcoop/felt/pull/86))

## 0.2.0

- **break**: convert to `snake_case` from `camelCase`
  ([#50](https://github.com/feltcoop/felt/pull/50))
- **break**: rename `src/util` from `src/utils`
  ([#56](https://github.com/feltcoop/felt/pull/56))
- add first pass at onboarding sketch
  ([#32](https://github.com/feltcoop/felt/pull/32))

## 0.1.4

- update Gro and publish with its new strategy
  ([#31](https://github.com/feltcoop/felt/pull/31))

## 0.1.3

- move utils from `@feltcoop/gro`
  ([#30](https://github.com/feltcoop/felt/pull/30))

## 0.1.2

- remove remaining Svelte components from public API until the full process is ready
  ([#29](https://github.com/feltcoop/felt/pull/29))

## 0.1.1

- remove `Nav.svelte` from the public API
  ([#27](https://github.com/feltcoop/felt/pull/27))

## 0.1.0

- publish
  ([#19](https://github.com/feltcoop/felt/pull/19))
