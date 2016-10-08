.PHONY: all build_ui_snapshot build_standalone_image

MESOS_VERSION ?= latest

MESOS_UI_VERSION ?= 0.1.4

all: build_mesos_image build_standalone_image

build_ui_snapshot:
	git checkout tags/$(MESOS_UI_VERSION)
	gulp build

build_mesos_image: build_ui_snapshot
	sed "s/VERSION/$(MESOS_VERSION)/g" DockerfileMesos > TempDockerfile
	docker build -f TempDockerfile -t capgemini/mesos-ui:$(MESOS_UI_VERSION) -t capgemini/mesos-ui:latest .

build_standalone_image:
	docker build -t capgemini/mesos-ui:standalone-$(MESOS_UI_VERSION) -t capgemini/mesos-ui:standalone-latest .
