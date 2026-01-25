# Analytics Endpoint Documentation

## Overview

`analytics.php` is a lightweight analytics endpoint that logs user activity from the Quick Reviews iOS app to a CSV file.

## Endpoint

```
GET /analytics.php
```

## Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `mediaType` | string | `"unknown"` | Type of media being reviewed (`movie`, `tv show`) |
| `deviceType` | string | `"unknown"` | User's device (`iPhone`, `iPad`) |
| `isPremium` | string | `"false"` | Whether user has premium subscription (`true`/`false`) |
| `action` | string | `"unknown"` | The action being tracked (see Actions below) |
| `records` | string | `"0"` | Number of records involved in the action |
| `accentColor` | string | `"unknown"` | User's selected accent color |
| `imageStyle` | string | `"unknown"` | User's selected image style |

## Actions

| Action | Description |
|--------|-------------|
| `savedReview` | User saved a new review |
| `clearHistory` | User cleared their review history |
| `importReviews` | User imported reviews |

## Response

Returns `204 No Content` on success.

## Storage

Data is appended to `ios-logs.csv` in the same directory with the following columns:

```
Timestamp,MediaType,DeviceType,IsPremium,Action,Records,AccentColor,ImageStyle
```

## Example Request

```
GET /analytics.php?mediaType=movie&deviceType=iPhone&isPremium=true&action=savedReview&records=0&accentColor=blue&imageStyle=poster
```

## Example Log Entry

```csv
2025-01-26 15:08:39,movie,iPhone,true,savedReview,0,blue,poster
```
