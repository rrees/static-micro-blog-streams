import sys

from pathlib import Path
from string import Template

index_page_template = """---
layout: stream.njk
title: {topic}

streamName: {topic}
postsTag: {tag_name}

eleventyExcludeFromCollections: ['post', '{tag_name}']
---
"""

data_file_template = Template(
    """export default function () {
	return {
		tags: ['$tag_name']
	}
}
"""
)


def create_topic(topic_name: str, tag_name: str):
    normalised_topic_name = topic_name.lower().replace(" ", " - ")

    topic_path = Path(f"src/{normalised_topic_name}")

    topic_path.mkdir(exist_ok=True)

    index_page_path = Path(topic_path, "index.njk")

    if not index_page_path.exists():
        index_page_path.write_text(
            index_page_template.format(topic=topic_name, tag_name=tag_name)
        )

    data_file_path = Path(topic_path, f"{normalised_topic_name}.11tydata.js")

    if not data_file_path.exists():
        data_file_path.write_text(data_file_template.substitute(tag_name=tag_name))


if __name__ == "__main__":
    if len(sys.argv) != 1 + 2:
        print("Usage: <topic name> <tag name>")
        sys.exit(1)

    create_topic(sys.argv[1], sys.argv[2])
