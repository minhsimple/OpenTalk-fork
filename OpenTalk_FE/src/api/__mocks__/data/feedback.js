export const feedbackMockData = {};

for (let m = 1; m <= 100; m++) {
    feedbackMockData[m] = Array.from({ length: 10 }).map((_, i) => ({
        id: m * 10 + i,
        meetingId: m,
        user: {
            username: `user${m}-${i + 1}`,
            avatar: '/placeholder.svg',
        },
        rating: (i % 5) + 1,
        comment: `This is feedback ${i + 1} for meeting ${m}`,
    }));
}
