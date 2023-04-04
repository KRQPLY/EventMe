<template>
  <div class="friends-container">
    <div class="header">
      <div class="label">Friends</div>
      <Select
        label="friends"
        :options="['friends', 'requests', 'invited', 'invite']"
        defaultOption="friends"
        @select="handleSelect"
      />
    </div>
    <div class="options-container">
      <div class="list">
        <UsersList
          :users="friendsAccepted"
          deleteButton
          v-if="option === 'friends'"
          @updated="$emit('updated')"
        />
        <UsersList
          :users="friendsRequesting"
          acceptButton
          deleteButton
          v-else-if="option === 'requests'"
          @updated="$emit('updated')"
        />
        <UsersList :users="friendsRequested" v-else-if="option === 'invited'" />
      </div>
      <div class="add-friend" v-if="option === 'invite'">
        <FormField
          name="username"
          type="text"
          label="Enter username"
          theme-responsive
          @keyup.enter="handleInvite"
        />
        <Button filled @click="handleInvite">Invite</Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import UsersList from '@/components/UsersList.vue'
import Select from '@/components/Select.vue'
import Button from '@/components/Button.vue'
import FormField from '@/components/FormField.vue'
import { ref, toRef, computed } from 'vue'
import { useForm } from 'vee-validate'
import postData from '@/helpers/postData'

const props = defineProps({ friendsData: { type: Array, default: [] } })

const emits = defineEmits(['updated'])

const friendsRef = toRef(props, 'friendsData')
const option = ref('friends')

const { values, setFieldError, setFieldValue } = useForm()

const friendsAccepted = computed(() =>
  friendsRef.value
    .filter((friend) => friend.invitationReceived && friend.invitationSent)
    .map((friend) => friend.username)
)
const friendsRequested = computed(() =>
  friendsRef.value.filter((friend) => friend.invitationSent).map((friend) => friend.username)
)
const friendsRequesting = computed(() =>
  friendsRef.value.filter((friend) => friend.invitationReceived).map((friend) => friend.username)
)

function handleSelect(optionVal) {
  option.value = optionVal
}

async function handleInvite() {
  const response = await postData(`${import.meta.env.VITE_API_URL}/friends/${values.username}`)

  if (!response.error) {
    setFieldError('username', response.error)
  } else {
    setFieldValue('username')
  }
  emits('updated')
}
</script>

<style lang="scss" scoped>
.friends-container {
  padding: 0 10px;
  margin-top: 10px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .label {
      color: $color-contrast;
      font-size: 30px;
    }
  }
  .options-container {
    height: 200px;
    .list {
      display: flex;
      flex-direction: column;
      border-radius: 7px;
      gap: 10px;
      margin-top: 10px;
      overflow-y: auto;
      max-height: 200px;
    }
    .add-friend {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      background-color: $color-secondary;
      padding: 10px 10px;
      border-radius: 7px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
@include media-xs {
  .friends-container {
    padding: 0 30px;
    .options-container {
      .add-friend {
        padding: 10px 20px;
        flex-direction: row;
      }
    }
  }
}
@include media-sm {
  .friends-container {
    padding: 0 70px;
  }
}
@include media-md {
  .friends-container {
    padding: 0 150px;
  }
}
@include media-lg {
  .friends-container {
    padding: 0 250px;
  }
}
@include media-xl {
  .friends-container {
    padding: 0 350px;
  }
}
@include media-hd {
  .friends-container {
    padding: 0 450px;
  }
}
</style>
