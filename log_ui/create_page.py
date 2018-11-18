if __name__ == "__main__":
    import os
    import sys
    import jinja2

    def multiline_input(msg, joiner="\n"):
        lines = []
        print(msg)
        while True:
            line = input()
            if line:
                lines.append(line)
            else:
                break
        return joiner.join(lines)

    here = os.path.dirname(os.path.realpath(__file__))

    template_loader = jinja2.FileSystemLoader(searchpath=here)
    env = jinja2.Environment(loader=template_loader)
    template = env.get_template('template.html')
    master_msg = multiline_input("Messages maître :")
    slaves_msg = multiline_input("Messages esclaves :")
    footer = multiline_input("Footer :", joiner="<br>")

    output_name = sys.argv[1]
    with open(output_name + ".html", "w") as f:
        f.write(template.render(
            master_messages=master_msg,
            slaves_messages=slaves_msg,
            footer=footer
        ))
