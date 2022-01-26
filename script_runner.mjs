#!/usr/bin/env zx

import 'zx/globals';

await Promise.all([
    "contentcards",
    "uploadeddocuments",
    "drawercards",
    "comments",
    "content_services",
    "notifications",
    "reports",
    "pushtokens",
    "message_threads",
    "messages",
    "tags",
    "pledge_activity",
    "application_activity",
    "workflow_state",
    "violation_reports",
    "contentcards_receipts",
    "organizations",
    "did_documents",
    "credential_templates",
    "verifiable_credential_receipts",
    "orders",
    "products",
    "verifiable_credentials",
    "quests",
    "course_progress",
    "survey_answers",
    "user_courses",
    "survey_questions"
].map(async collection => {
    await $`variety meteor/${collection} --host localhost --port 4001 --outputFormat json --quiet > ./schemas/variety/${collection}.json`
    await $`node script.js ./schemas/variety/${collection}.json ./schemas/${collection}.json`
}));
